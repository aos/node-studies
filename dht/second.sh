#!/bin/bash
# Get [key, value] pairs 

url="http://localhost:3000/search?"

counter=0
while [ $counter -lt 1000 ]
do
  key="key=${counter}"
  new="${url}${key}"
  
  counter=$[counter + 1]
  curl "$new"
done

# Negative test
curl "${url}key=1001"
