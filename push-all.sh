#!/bin/bash

images=(
  student-service
  scholarship-service
  application-service
  reviewer-service
  file-service
  admin-service
  api-gateway
  auth-service
)

for image in "${images[@]}"
do
  docker push maxwellc21/$image:latest
done
