import {formatImage} from "../plugins/globals";

export const SHIPMENT_METHODS = {
  PICK_UP: {
    cost: 0,
    method: "pick-up"
  },
  DELIVERY: {
    cost: 800,
    method: "delivery"
  }
};

var sort = function (prop, arr) {
  prop = prop.split('.');
  var len = prop.length;

  arr.sort(function (a, b) {
    var i = 0;
    while( i < len ) {
      a = a[prop[i]];
      b = b[prop[i]];
      i++;
    }
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
};

export class Product {
  constructor(data, categories = []) {
    if (!data) return {};

    this._data = data;
    this.info = {
      id: data.id,
      slug: data.ProductSlug,
      name: data.Name
    };
    this.cover = {
      image: formatImage(data?.ImageCover?.url || ""),
      text: data.TextCover
    };
    this.meta = {
      title: data.MetaTitle,
      desc: data.MetaDescription
    };
    this.gallery = {
      main: {
        url: data?.MainImage?.url,
        alternativeText: data?.MainImage?.alternativeText || 'Nordic IT Rental udlejning - ' + data?.Name,
      },
      thumbnails: data.ProductGallery,
    };
    this.pricing = {
      daily: parseFloat(data.DailyPriceAfterWeek),
      weekly: parseFloat(data.DailyPrice * 8)
    };
    this.descriptions = {
      short: data.DescriptionShort,
      long: data.DescriptionLong
    };
    this.features = (data.ProductAttributes || []).map(attr => ({
      key: attr.AttributeKey,
      value: attr.AttributeValue
    }));
    this.categories = categories;
    this.options = this.getProductOptions(data.ProductOptionsP, categories);
    this.upsell = (data?.ProductsUpsell || []).map(p => new Product(p));
  }

  getProductOptions(optsFromProduct = [], categories = []) {
    const productOptionsFromCategory = [];

    categories
      .map(cat => cat.ProductOptionsP)
      .forEach(opts => {
        productOptionsFromCategory.push(...opts);
      });

    const options = [...optsFromProduct, ...productOptionsFromCategory];
    const uniqueOptionIds = [...new Set(options.map(o => o.id))];

    return uniqueOptionIds.map(id => options.find(o => o.id === id));
  }
}

export class Category {
  constructor(data) {
    if (!data) return {};

    this.info = {
      id: data.id,
      name: data.Name,
      slug: data.Slug
    }

    this.img = formatImage((data?.UpsellIcon || {}).url || "")

    this.cover = {
      text: data.TextCover,
      image: formatImage(data?.ImageCover?.url || "")
    };
    this.meta = {
      title: data.MetaTitle,
      desc: data.MetaDescription
    };
    this.description = data.Description;

    const unsortedProducts = (data.products || []).map(product => new Product(product))

    this.products = sort('pricing.weekly', unsortedProducts);

    this.upsell = (data?.CategoryUpsell || []).map(cat => ({
      Image: cat.UpsellIcon,
      Title: cat.Name,
      Slug: cat.Slug
    }))
  }
}

export class Cart {
  constructor() {
    this.items = [];
    this.shipping = SHIPMENT_METHODS.DELIVERY;
  }
}

export class Order {
  constructor(email, cvrNumber, phone, customerId, items, shipping, shippingAdd, comments) {
    this.Products = this.processItems(items);
    this.CustomerId = customerId;
    this.OrderComments = comments || "";
    this.OrderShippingFirstName = shippingAdd.firstName || "";
    this.OrderShippingLastName = shippingAdd.lastName || "";
    this.OrderShippingCompany = shippingAdd.companyName || "";
    this.OrderShippingAddress = shippingAdd.streetNameAndNo || "";
    this.OrderShippingCity = shippingAdd.town || "";
    this.OrderShippingZip = shippingAdd.zipCode || "";
    this.OrderShippingCountry = shippingAdd.country || "";
    this.OrderEmail = email || "";
    this.OrderCvrNew = cvrNumber || "";
    this.OrderPhone = phone || "";
    this.ShippingHandlingName = shipping.method || "";
    this.ShippingHandlingCost = shipping.cost || 0;
    this.OrderTotalExVat = this.getOrderTotal(items, shipping.cost);
    this.OrderTotalVat = 1.25 * this.OrderTotalExVat
  }

  processItems(items) {
    return items.map(item => {
      return {
        ProductId: item.productId,
        ProductName: item.product?.info?.name || "",
        ProductRentalFrom: item.startDate,
        ProductRentalTo: item.endDate,
        ProductRentalSum: item.price,
        ProductQty: item.amount,
        ProductRentalSubTotal: item.totalPriceWithoutOptions,
        ProductOptions: item.productOptions.map(po => ({
          ProductName: po.name,
          ProductPrice: po.price,
          ProductId: po.id,
          ProductQty: 1
        }))
      };
    });
  }

  getOrderTotal(items, shippingCost) {
    const itemsCost = items.reduce((total, item) => {
      total += item.price;
      return total;
    }, 0);
    return itemsCost + shippingCost;
  }
}

export class Customer {
  constructor(data) {
    this.CustomerFirstName = data.firstName || "";
    this.CustomerLastName = data.lastName || "";
    this.CustomerEmail = data.email || "";
    this.CustomerCompanyName = data.companyName || "";
    this.CustomerAddress = data.streetNameAndNo || "";
    this.CustomerCity = data.town || "";
    this.CustomerZip = data.zipCode || "";
    this.CustomerCountry = data.country || "";
    this.CustomerPhone = data.phone || "";
    this.CustomerCompanyCVR = data.cvrNumber || "";
  }
}
