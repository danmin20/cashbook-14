<h1 align="center">πΈ http://3.36.99.206:3000/ πΈ</h2>

### 4-5μ£Όμ°¨ 14ν - [μ΄μ λ―Ό](https://github.com/danmin20) && [μ μ΄μ§](https://github.com/ondal1997)
### [λ°λͺ¨μμ](https://youtu.be/dSMTCyDyto8) [Wiki](https://github.com/woowa-techcamp-2021/cashbook-14/wiki)
`Typescript` `Webpack` `Babel` `Node.js` `Express` `SCSS` `OAuth2` `MySQL` `TypeORM` `EC2` `Canvas` `jsx`

<br/>

# 

## `Characteristic`

- github oauthλ₯Ό νμ©ν νμκ°μ & λ‘κ·ΈμΈ
- λΌμ΄νΈλͺ¨λ / λ€ν¬λͺ¨λ μ ν λ° μ μ§
- canvasλ₯Ό νμ©ν λ°μ΄ν° μκ°ν
- PC νλ©΄ / Mobile νλ©΄ 
- crontabμ νμ©ν CD

<br/>

## `Install & Execute`

- development νκ²½ - `.env`
- production νκ²½ - `dev.env`

### client/.env
```
API_URL = μλ² endpoint
```

### server/.env
```
DB_NAME = λ°μ΄ν°λ² μ΄μ€ μ΄λ¦
DB_USER = λ°μ΄ν°λ² μ΄μ€ μ μ 
DB_PW = λΌμ΄ν°λ² μ΄μ€ λΉλ°λ²νΈ
DB_HOST = λ°μ΄ν°λ² μ΄μ€ νΈμ€νΈ
DB_PORT = λ°μ΄ν°λ² μ΄μ€ ν¬νΈ
GITHUB_CLIENT_ID = Github OAuth client id
GITHUB_CLIENT_SECRETS = Github OAuth client secret
COOKIE_SECRET = μΏ ν€ μμ±ν€
SERVER_URL = μλ² μ£Όμ
```

<br/>

## `Structure`

```
client
βββ assets                          # νμν λ¦¬μμ€λ€
βββ src
    βββ api                         # api κ΄λ ¨ ν¨μλ€
    βββ Components                  # μ»΄ν¬λνΈλ€
    β   βββ atom
    β   βββ molecule
    β   βββ organism
    βββ Controller     
    βββ core                        
    βββ Model                
    βββ Pages                   
    βββ scss
    βββ shared
    βββ utils

server
βββ controllers
βββ middlewares                  
βββ queries
βββ routes
βββ services
βββ app.ts
βββ custom.d.ts
βββ envConfig.ts
βββ database.ts
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
