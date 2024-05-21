export default {
  title: "Summary Block Content",
  name: "summaryBlockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        /* { title: "Normal", value: "normal" },
        { title: "H1", value: "h1mock" },
        { title: "H2", value: "h2mock" },
        { title: "H3", value: "h3mock" },
        { title: "H4", value: "h4mock" },
        { title: "Quote", value: "blockquote" }, */
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          /* {
            type: "link",
          }, */
          /*  {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          }, */
        ],
      },
    },
    /* {
      type: 'youtube'
    }, */
    /* {
      type: "complexImage",
    }, */
    /* {
      type: 'vimeo'
    },
    {
      type: 'instagramPost'
    } */
  ],
};
