#!/bin/sh
yarn
npx prisma generate
yarn next build
$1