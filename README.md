# whois-not-found

> 用來爬還沒被註冊的域名

## Introduction

whois-not-found is a **whois domain and output not-found** for search not registered of domain.

## Dependencies

- use `whois-api`

## Usage

```sh
npm i

# search <a-z>.com domain
node index.js com 3 en

# search <0-9>.com domain
node index.js com 3 number
```