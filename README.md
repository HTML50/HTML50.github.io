# What is this

It is my blog. And I build this with Javascript and CSS, no framework at all.

have a glimpse of my blog (CHINESE character)

http://es5.site



# Why 

I prefer writing blog in markdown with Typora, which has a feature that can convert a *.md file into *.html

I've learned that `git push` is necessary when setting a blog via Github pages, I don't want to learn how other framework works, so I build a blog tool for myself.

if you like, you can clone this repo and have a try.



# How does it work

a bat/bash file to find the newest blog file and thumbnail image, writing  html into list.html, then git push.



# How to use

1. clone this repo and git push.

2. wrte a new blog in Typora, export into `html` without styles.

3. put the *.html into folder `./blog`, and new blogs  thumbnail *.png into `./list-img`

4. WINDOWS: (power Shell) `.\update.bat MEMO `

   Linux: `./update MEMO`

5. all be well done if lucky.





## PS

~~this tool is only work in Windows ( because of I used *.bat for auto update ).~~

update a Linux bash. You can keep the file you need and delete the others. (for Windows `make.bat`, `update.bat`, for Linux `update`)

