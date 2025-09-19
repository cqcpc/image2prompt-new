# 认证配置指南

## 问题概述
当前登录页面无法正常工作，因为缺少必要的认证服务配置。

## 需要配置的服务

### 1. GitHub OAuth App
**用途**: 允许用户通过GitHub账号登录

**配置步骤**:
1. 访问 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写应用信息：
   - Application name: `Saasfly`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. 创建后获取 Client ID 和 Client Secret

**环境变量**:
```env
GITHUB_CLIENT_ID='你的_github_client_id'
GITHUB_CLIENT_SECRET='你的_github_client_secret'
```

### 2. Resend Email 服务
**用途**: 发送邮件验证链接

**配置步骤**:
1. 访问 https://resend.com
2. 注册账号并获取API密钥
3. 验证域名或使用提供的测试域名

**环境变量**:
```env
RESEND_API_KEY='你的_resend_api_key'
RESEND_FROM='onboarding@resend.dev'  # 或您验证的邮箱
```

### 3. NextAuth Secret
**用途**: 加密会话令牌

**生成命令**:
```bash
openssl rand -base64 32
```

**环境变量**:
```env
NEXTAUTH_SECRET='生成的复杂随机字符串'
```

### 4. Stripe 配置（可选，用于付费功能）
**环境变量**:
```env
STRIPE_API_KEY='你的_stripe_api_key'
STRIPE_WEBHOOK_SECRET='你的_stripe_webhook_secret'
```

## 临时解决方案
如果您只想测试登录界面，可以暂时禁用邮件验证：

1. 修改 `/packages/auth/nextauth.ts`，注释掉EmailProvider
2. 或者只使用GitHub登录进行测试

## 验证配置
配置完成后，重启开发服务器：
```bash
bun run dev:web
```

访问 http://localhost:3000/en/login 测试登录功能。

## 注意事项
- 所有敏感密钥都应该保持机密
- 生产环境需要使用真实的域名和配置
- 本地开发可以使用测试配置