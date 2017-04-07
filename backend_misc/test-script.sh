echo '\nCreate user'
curl -H "Content-Type: application/json; charset=utf-8" \
     -X "POST" "http://localhost:3000/users" \
     -d '{ 
    "username":"steven",
    "email":"steven@steven.ca",
    "password":"233333"
}'

echo '\nCreate a sencond user'
curl -H "Content-Type: application/json; charset=utf-8" \
     -X "POST" "http://localhost:3000/users" \
     -d '{ 
    "username":"sherwin",
    "email":"sherwin@sherwin.ca",
    "password":"666666"
}'

echo '\nUser login'
curl -H "Content-Type: application/json; charset=utf-8" \
     -X "POST" "http://localhost:3000/login" \
     -d '{ 
    "username":"steven",
    "password":"233333"
}'

echo '\nCreate post'
curl -H "Content-Type: application/json; charset=utf-8" \
     -X "POST" "http://localhost:3000/post" \
     -d '{ 
    "username":"steven",
    "title":"best sushi",
    "category":"food",
    "location":"Toronto",
    "visibility":"public",
    "descriptions":"Yummy Yummy"
}'

echo '\nSecond user joins a acitivity'
curl -H "Content-Type: application/json; charset=utf-8" \
     -X "PUT" "http://localhost:3000/join/1" \
     -d '{ 
    "username":"sherwin"
}'

echo '\nCreate comment'
curl -H "Content-Type: application/json; charset=utf-8" \
     -X "POST" "http://localhost:3000/comment" \
     -d '{ 
    "username":"userc",
    "contents":"this is a comment"
}'

echo '\nGet a post'
curl "http://localhost:3000/posts/1" \
     -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjEsImV4cCI6MTQ4OTg4NjM5NzE4MH0.v-uxbiy3SiGmPrQfXoYWgTngEdm2m9NOjdG5WlAYMuY"

echo '\nGet all posts'
curl "http://localhost:3000/posts" \
     -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjEsImV4cCI6MTQ4OTg4NjM5NzE4MH0.v-uxbiy3SiGmPrQfXoYWgTngEdm2m9NOjdG5WlAYMuY"	

echo '\nUpdate a post'
curl -H "Content-Type: application/json; charset=utf-8" \
     -X "PUT" "http://localhost:3000/posts/1" \
     -d '{ 
    "title":"Rename this post",
    "category":"shopping",
    "descriptions":"Modify this descriptions"
}'

echo '\nDelete a post'
curl -H "Content-Type: application/json; charset=utf-8" \
	  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjEsImV4cCI6MTQ4OTg4NjM5NzE4MH0.v-uxbiy3SiGmPrQfXoYWgTngEdm2m9NOjdG5WlAYMuY" \
     -X "DELETE" "http://localhost:3000/posts/1"

echo '\nDelete user'
curl -H "Content-Type: application/json; charset=utf-8" \
     -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjEsImV4cCI6MTQ4OTg4NjM5NzE4MH0.v-uxbiy3SiGmPrQfXoYWgTngEdm2m9NOjdG5WlAYMuY" \
     -X "DELETE" "http://localhost:3000/users/1"