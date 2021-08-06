<h1 align="center">💸 http://3.36.99.206:3000/ 💸</h2>

### 4-5주차 14팀 - [이정민](https://github.com/danmin20) && [신어진](https://github.com/ondal1997)
### [데모영상](https://youtu.be/dSMTCyDyto8) [Wiki](https://github.com/woowa-techcamp-2021/cashbook-14/wiki)
`Typescript` `Webpack` `Babel` `Node.js` `Express` `SCSS` `OAuth2` `MySQL` `TypeORM` `EC2` `Canvas` `jsx`

<br/>

# 

## `Characteristic`

- github oauth를 활용한 회원가입 & 로그인
- 라이트모드 / 다크모드 전환 및 유지
- canvas를 활용한 데이터 시각화
- PC 화면 / Mobile 화면 
- crontab을 활용한 CD

<br/>

## `Install & Execute`

- development 환경 - `.env`
- production 환경 - `dev.env`

### client/.env
```
API_URL = 서버 endpoint
```

### server/.env
```
DB_NAME = 데이터베이스 이름
DB_USER = 데이터베이스 유저
DB_PW = 떼이터베이스 비밀번호
DB_HOST = 데이터베이스 호스트
DB_PORT = 데이터베이스 포트
GITHUB_CLIENT_ID = Github OAuth client id
GITHUB_CLIENT_SECRETS = Github OAuth client secret
COOKIE_SECRET = 쿠키 생성키
SERVER_URL = 서버 주소
```

<br/>

## `Structure`

```
client
├── assets                          # 필요한 리소스들
└── src
    ├── api                         # api 관련 함수들
    ├── Components                  # 컴포넌트들
    │   ├── atom
    │   ├── molecule
    │   └── organism
    ├── Controller     
    ├── core                        
    ├── Model                
    ├── Pages                   
    ├── scss
    ├── shared
    └── utils

server
├── controllers
├── middlewares                  
├── queries
├── routes
├── services
├── app.ts
├── custom.d.ts
├── envConfig.ts
└── database.ts
```

<br/>

## `ERD`
<img src="https://user-images.githubusercontent.com/50590192/128454617-7f499a37-dbee-4efb-8a60-82bea7427ab7.png" width="350" />

<br/>

## `Screenshots`

<div>
<img src="https://user-images.githubusercontent.com/50590192/128396728-7e4376e2-ad0d-4876-84db-0b47c193fcb5.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396740-2b3374d5-1bf0-4473-a29b-9f4629c1bd76.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396792-81646f63-052f-44df-b88a-5f331802726a.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396824-d0fef9d9-831a-419c-9135-0f6e3fcaa682.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396846-3b95fd1e-1f88-4f65-8230-2b91a1751977.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396863-871f46a6-0477-43d0-b132-871a75273fbe.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396881-495e4105-86ab-4f17-b4e3-ccce9de5f888.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396894-f2896c0a-2d8d-4ef0-be8b-711f88c12991.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396910-818ea1f9-f6d7-48a0-bc32-515aa7e28a02.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396949-7fd199a8-ac63-4b24-9d17-8fb3689a5301.png" width="450" />
<img src="https://user-images.githubusercontent.com/50590192/128396962-accfc6be-61ff-44e9-bdf4-b22bd2eb5883.png" width="450" />
</div>
    
<div>
<img src="https://user-images.githubusercontent.com/50590192/128397051-70590591-33a1-46a6-a514-4ef5f85e02a9.png" width="300" />
<img src="https://user-images.githubusercontent.com/50590192/128397143-fe5fc39e-8188-40c4-8f83-81b5f7380746.png" width="300" />
<img src="https://user-images.githubusercontent.com/50590192/128397109-f58b8844-b9d6-411d-b8ac-625c742c7058.png" width="300" />
<img src="https://user-images.githubusercontent.com/50590192/128397180-3b9be9cf-b6c7-47f2-9ebb-d7c9de7e7b77.png" width="300" />
<img src="https://user-images.githubusercontent.com/50590192/128397238-052b9b09-9c3d-429d-b2b5-4de69fe069d1.png" width="300" />
<img src="https://user-images.githubusercontent.com/50590192/128397304-336ab850-f0be-4de4-a190-69b5841bbd21.png" width="300" />
</div>
