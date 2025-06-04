#!/bin/bash

# 获取版本号
VERSION=$(node -p "require('./package.json').version")
TAG="v$VERSION"

# 添加、提交、打标签并推送
git tag $TAG
git push origin main --follow-tags
