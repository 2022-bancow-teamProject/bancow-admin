# docker 설정

- docker build -t bancowadmin .

  - 이미지 생성

- docker images

  - 생성된 이미지 확인

- docker run --rm -it --name Admin -p 3001:3001 bancowadmin

  - 가동되는 주소
  - http://localhost:3001/

  - 페이지가 보이려면 이하의 주소
  - http://localhost:3001/manager
