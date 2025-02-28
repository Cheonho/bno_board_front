FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

COPY ./src/index.tsx /usr/share/nginx/html/index.tsx

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# docker의 nginx 사용 시 localhost 사용 x (docker와 host pc의 localhost가 달라 제대로 안될 경우가 있음)
# localhost 사용 시 docker의 localhost 화면이 나옴
# => 192.168.35.199 host pc ip를 명시해 줘야 제대로 작동함

# docker file을 이용해 image 생성
# docker build -t nginx:react-nginx .

# docker container 생성 및 실행
# docker run -d -p 80:80 --name react-nginx nginx:react-nginx

# docker container 실행 확인
# docker ps

# docker container 실행
# docker start react-nginx