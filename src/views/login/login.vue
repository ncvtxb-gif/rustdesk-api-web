<template>
  <main class="login-page">
    <div class="login-wrapper">
      <section class="login-brand" aria-label="RustDesk API Admin">
        <img src="@/assets/logo.png" alt="RustDesk" class="brand-logo"/>
        <h1 class="brand-title">RustDesk API Admin</h1>
        <p class="brand-desc">甜秘密远程桌面管理</p>
      </section>

      <section class="login-panel">
        <div class="login-heading">
          <span class="login-eyebrow">ENTERPRISE ACCESS</span>
          <h2>欢迎登录</h2>
          <p>使用公司飞书账号完成身份验证</p>
        </div>

        <div class="oidc-options" aria-label="飞书登录">
          <div v-for="(option, index) in options" :key="index" class="oidc-option">
            <el-button type="primary" size="large" @click="handleOIDCLogin(option.name)" class="oidc-btn">
              <img :src="getProviderImage(option.name)" alt="" class="oidc-icon"/>
              <span>{{ T(option.name) }}</span>
            </el-button>
          </div>
        </div>
        <p class="login-note">仅限已授权的企业成员使用</p>
      </section>
    </div>
  </main>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { ElMessage } from 'element-plus'
  import { T } from '@/utils/i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { loginOptions } from '@/api/login'
  import { getCode, removeCode } from '@/utils/auth'
  import { selectFeishuLoginOptions } from './enterprise-login.mjs'

  const userStore = useUserStore()
  const route = useRoute()
  const router = useRouter()
  const options = ref([])

  let platform = window.navigator.platform
  if (navigator.platform.indexOf('Mac') === 0) {
    platform = 'mac'
  } else if (navigator.platform.indexOf('Win') === 0) {
    platform = 'windows'
  } else if (navigator.platform.indexOf('Linux armv') === 0) {
    platform = 'android'
  } else if (navigator.platform.indexOf('Linux') === 0) {
    platform = 'linux'
  }
  const userAgent = navigator.userAgent
  let browser = 'Unknown Browser'
  if (/chrome|crios/i.test(userAgent)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox'
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari'
  else if (/edg/i.test(userAgent)) browser = 'Edge'

  const redirect = route.query?.redirect

  const handleOIDCLogin = (provider) => {
    userStore.oidc(provider, platform, browser)
  }

  import googleImage from '@/assets/google.png'
  import githubImage from '@/assets/github.png'
  import oidcImage from '@/assets/oidc.png'
  import defaultImage from '@/assets/oidc.png'

  const providerImageMap = {
    google: googleImage,
    github: githubImage,
    oidc: oidcImage,
    default: defaultImage,
  }

  const getProviderImage = (provider) => {
    return providerImageMap[provider.toLowerCase()] || providerImageMap.default
  }

  const loadLoginOptions = async () => {
    try {
      const res = await loginOptions().catch(_ => false)
      if (!res || !res.data) return console.error('No valid response received')
      options.value = selectFeishuLoginOptions(res.data.ops).map(name => ({ name }))
    } catch (error) {
      console.error('Error loading login options:', error.message)
    }
  }

  onMounted(async () => {
    const code = getCode()
    if (code) {
      // 如果code存在，进行query获取user info
      const res = await userStore.query(code)
      if (res) {
        // 删除code，确保跳转之前对code进行清楚
        removeCode()
        ElMessage.success(T('LoginSuccess'))
        router.push({ path: redirect || '/', replace: true })
      }
    } else {
      loadLoginOptions()
    }
  })
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  background:
    radial-gradient(circle at 18% 20%, rgba(79, 110, 247, 0.14), transparent 32%),
    #f5f7fb;
  padding: 32px;
  box-sizing: border-box;
}

.login-wrapper {
  display: grid;
  grid-template-columns: minmax(300px, 0.9fr) minmax(360px, 1.1fr);
  width: min(880px, 100%);
  min-height: 500px;
  background: #fff;
  border: 1px solid rgba(79, 110, 247, 0.12);
  border-radius: 18px;
  box-shadow: 0 24px 64px rgba(29, 33, 41, 0.12);
  overflow: hidden;
}

.login-brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 56px;
  color: #fff;
  background:
    radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.2), transparent 34%),
    linear-gradient(145deg, #4564e6, #5f6fea);
}

.brand-logo {
  width: 72px;
  height: 72px;
  padding: 10px;
  margin-bottom: 28px;
  border-radius: 16px;
  background: #fff;
  box-sizing: border-box;
}

.brand-title {
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand-desc {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 15px;
}

.login-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 56px 64px 64px;
}

.login-heading {
  margin-bottom: 34px;

  h2 {
    margin: 10px 0;
    color: #1d2129;
    font-size: 28px;
    line-height: 1.25;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    color: #86909c;
    line-height: 1.7;
  }
}

.login-eyebrow {
  color: #4f6ef7;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.oidc-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.oidc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 48px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(79, 110, 247, 0.2);
}

.oidc-icon {
  width: 24px;
  height: 24px;
}

.login-note {
  margin: 22px 0 0;
  color: #a0a6b1;
  font-size: 12px;
  text-align: center;
}

@media (max-width: 720px) {
  .login-page { padding: 18px; }
  .login-wrapper { grid-template-columns: 1fr; }
  .login-brand { display: none; }
  .login-panel { padding: 44px 30px 48px; }
}
</style>
