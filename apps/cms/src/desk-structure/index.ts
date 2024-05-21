import S from "@sanity/desk-tool/structure-builder";

const bannerItem = S.listItem()
  .title("Banner")
  .child(S.document().schemaType("banner").documentId("banner"));

const baseItems = S.documentTypeListItems().filter(
  (listItem) => !["banner"].includes(listItem.getId())
);

export default () =>
  S.list()
    .title("Base")
    .items([bannerItem, ...baseItems]);
