---
title: "Accidentally Reinventing the Wheel - and Coming Out Richer for it"
subtitle: "How I accidentally implemented a bare-bones background worker framework"
date: 2025-07-07T16:11:13+05:30
lastmod: 2025-07-07T16:11:13+05:30
draft: false
description: ""
images: []

tags: [programming, rails]
categories: []

featuredImage: ""
featuredImagePreview: ""

hiddenFromHomePage: false
hiddenFromSearch: false
twemoji: false
lightgallery: true
ruby: true
fraction: true
fontawesome: true
linkToMarkdown: false
rssFullText: false

toc:
  enable: true
  auto: true
  keepStatic: false
code:
  copy: true
  maxShownLines: 50
share:
  enable: true
comment:
  enable: false
library:
  css:
    # someCSS = "some.css"
    # located in "assets/"
    # Or
    # someCSS = "https://cdn.example.com/some.css"
  js:
    # someJS = "some.js"
    # located in "assets/"
    # Or
    # someJS = "https://cdn.example.com/some.js"
seo:
  images: []
---

Imagine 

```ruby
# app/models/background_job.rb
class BackgroundJob < ApplicationRecord
  def self.enqueue(method, *args)
    create!(method: method, args: args.to_json, status: "queued")
  end
 
  def perform
    update!(status: "running")
    # Danger: `send` with user input is risky! (I fixed this later)
    result = Object.const_get(class_name).send(method, *JSON.parse(args))
    update!(status: "completed", result: result.to_json)
  rescue => e
    update!(status: "failed", error: e.message)
  end
end
```