FROM ${appiness.docker.registry}/nginx:${appiness.docker.nginx.version}

MAINTAINER Appiness (didier.deschepper@appiness.mobi)

ADD /files/docroot /var/www/html

RUN ln -s /var/lib/appiness/nginx/external.conf.d /etc/nginx/external.conf.d
RUN ln -s /var/lib/appiness/website/config /var/www/html/config

CMD ["nginx"]