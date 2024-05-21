// TODO: needs video
// TODO: needs some kind of small text for citations. Or this goes on the story itself.
export default {
  title: "Article Block Content",
  name: "articleBlockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1mock" },
        { title: "H2", value: "h2mock" },
        { title: "H3", value: "h3mock" },
        { title: "H4", value: "h4mock" },
        { title: "Quote", value: "blockquote" },
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
          {
            type: "link",
          },
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
    {
      type: "youtubeEmbed",
    },
    {
      type: "complexImage",
    },
    /* {
      type: 'vimeo'
    },
    {
      type: 'instagramPost'
    } */
  ],
};
