import github from '../third-party/github';

async function getAccessToken(code: string): Promise<string> {
  const { access_token: accessToken } = await github.authByCode(code);

  return accessToken;
}

export const AuthService = {
  getAccessToken,
};
