// Функция, возвращающая объект продукта
const returnResultProduct = (item) => {  
  const resultProduct = {
      id: item.id,
      id1c: getItemAttribute(item, 'id1c', ''),
      category: getItemCategory(item),
      image: getItemImage(item),
      title: getItemAttribute(item, 'title', ''),
      description: getItemAttribute(item, 'description', ''),
      stock: getAttributeValueAsNumber(item, 'stock'),
      storeplace: item.attributes.storeplace,
      attributes: getAttributes(item),
      quantitySales: getAttributeValueAsNumber(item, 'quantitySales'),
      price: getValidPrice(item.attributes.price),
      priceOpt: item.attributes.priceOpt,
      color: item.attributes.color
  };

  console.log(resultProduct);
  return resultProduct;
}


const getItemAttribute = (item, attributeName, defaultValue) => {
  return item.attributes?.[attributeName] || defaultValue;
}


const getItemCategory = (item) => {
  return item.attributes?.categories?.data?.map((category) => category.id) || [];
}

const getItemImage = (item) => {
  return item.attributes?.imgs?.data?.map((img) => img.attributes.url) || ['/noImage.jpg'];
}

const getAttributeValueAsNumber = (item, attributeName) => {
  return Number.parseInt(item.attributes?.[attributeName]) || 1;
}

const getAttributes = (item) => {
  return item.attributes?.Attributes?.attributes?.map((attr) => {
      if (attr.type === "Number") {
          return {
              name: attr.name,
              type: attr.type,
              value: Number.parseInt(attr.value),
          };
      }
      return attr;
  }) || [];
}

const getValidPrice = (price) => {
  const parsedPrice = Number.parseInt(price);
  return !isNaN(parsedPrice) ? parsedPrice : 1;
}

export default returnResultProduct;