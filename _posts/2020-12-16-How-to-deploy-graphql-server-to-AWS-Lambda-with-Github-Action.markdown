---
layout: post
title:  "How to deploy graphql server to AWS Lambda with Github Action"
date:   2020-12-16 17:11:34 +0700
categories: tech
---

while working on my personal project, I'm trying to deploy a Graphql server written in TypeScript to AWS Lambda using Github Action, which is Github CI/CD tool. I did it because currently using heroku dyno make the prototype very slow. I guess it's because the server is located in US and I'm using the free account. but I don't really understand much about how to speed up the server instance. 
I'm starting by reading a tutorial in [GraphQL official guideline](https://www.apollographql.com/docs/apollo-server/deployment/lambda/) about how to configure the graphql server to deploy in AWS Lambda. From here, I understand that we need to configure the server a little, at least two part is important
1. using [apollo-server-lambda](https://www.npmjs.com/package/apollo-server-lambda)
2. I'm gonna need another tools, *serverless* to deploy the server

But the 2nd point, I don't really like it because it means I need to deploy it from my computer which means it does not achieve my objective for CI/CD using github action.
