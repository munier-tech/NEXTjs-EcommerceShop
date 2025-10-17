import { defineArrayMember, defineType } from "sanity";



export const blockContentType = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of : [
    defineArrayMember({
      type : "block",
      styles : [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" }
      ],
      lists : [
        { title: "Bullet", value: "bullet" },
      ],
      marks : {
        decorators : [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Code", value: "code" }
        ],
        annotations : [
          {
            name : "link",
            type : "object",
            title : "Link",
            fields : [
              {
                name : "href",
                type : "url",
                title : "URL",
                validation : (Rule) => Rule.uri({
                  allowRelative : true,
                  scheme : ["http", "https", "mailto", "tel"]
                })
              }
            ]
          }
        ]
      }
    })
  ]
})