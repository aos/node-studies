#!/bin/bash
# Fill hash table with random [key, value] pairs

url="http://localhost:3000/post?"

counter=0
while [ $counter -lt 1000 ]
do
  key="key=${counter}"
  value="&value=${RANDOM}"
  new="${url}${key}${value}"
  
  counter=$[counter + 1]
  curl "$new"
done
