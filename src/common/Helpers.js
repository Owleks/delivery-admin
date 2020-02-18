export const formatDate = (date) => {
  const newDate = new Date(date);
  if(isNaN(newDate.getTime()))
    return 'N/A';
  return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
};

export const fillOrderData = (order, menuItems) => {
  order = {...order};
  order.totalPrice = 0;
  order.items.forEach(item => {
    const { price } = menuItems[item.menuItemId];
    order.totalPrice += price;
  });
  order.created = formatDate(order.dateCreated);
  order.updated = formatDate(order.dateUpdated);
  return order;
};

export const fillOrderItemsData = (orderItems, menuItems) => {
  orderItems = [...orderItems];
  return orderItems.map(item => {
    const { name, price, description, menuId, image, removed } = menuItems[item.menuItemId];
    return {
      ...item,
      name,
      price,
      description,
      menuId,
      image,
      removed
    };
  });
};
