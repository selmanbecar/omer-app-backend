pristup bazi: https://remotemysql.com/phpmyadmin, username:yJAS31YU4Z, password: pKpmRoWOge

takodjer potrebno u root dodati .env file sa sadrzajem:
DB_USERNAME=yJAS31YU4Z
DB_PASSWORD=pKpmRoWOge
DB_HOST=remotemysql.com
DB_NAME=yJAS31YU4Z
JWT_SECRET=shhhovojetajna

user sadrzi 3 role: rola: 0 = user
rola: 1 = admin
rola: 2 = user with permision for creating post

-The user should see all the posts that exist of all register users\*
GET http://localhost:8080/api/posts

-Only logged in user can like someone else's post (once)
POST http://localhost:8080/api/likes body:
{
"userId":1,
"postId":2
}
-Each user can edit and delete only their own post\*
DELETE http://localhost:8080/api/posts/id + admin token or owner token
EDIT http://localhost:8080/api/posts/id + admin token or owner token

-The user should have the option to change the pass (his own only)\*
EDIT http://localhost:8080/api/users/id + admin token or owner token body:{"password": "newPassword"}

-During registration, the user cannot submit post until the admin approves that user\*
Ako je user rol = 0 sto je default vrijednost nece moci submit post, dok admin ne promjeni na 2

-The admin should have the option to see all users who are registered and those who can post and those who cannot\*
GET http://localhost:8080/api/users + admin token - svi useri
GET http://localhost:8080/api/users/rol/:rol(1,2,0) + admin token - svi useri po roli

-There is also an admin role, the admin role can edit and delete everyone's post\*
admin rola je 1. takodjer imamo admin middleware gdje dajemo permisije po rutama

-The admin should be able to change the pass to everyone\*
admin ima mogucnost mjenjaja passworda svima
