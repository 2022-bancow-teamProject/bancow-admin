# docker 설정

- docker build -t bancowadmin .

  - 이미지 생성

- docker images

  - 생성된 이미지 확인

- docker run --rm -it --name Admin -p 3001:80 bancowadmin

  - http://localhost:3001/
