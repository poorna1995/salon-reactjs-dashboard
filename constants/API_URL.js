const domain = `https://ecom.hivepath.io/api`;

const API_URL = {
	MERCHANT: {
		REGISTRATION: `${domain}/merchant/registration`,
		FETCH_DATA: `${domain}/merchant/fetchdata`,
		UPDATE: `${domain}/merchant/update`,
		LOGIN: `${domain}/merchant/login`,
		LOGOUT: `${domain}/merchant/logout`,
	},
	PRODUCT: {
		MERCHANT: {
			ADD_PRODUCT: `${domain}/merchant/addproduct`,
			FETCH_PRODUCT: `${domain}/merchant/fetchproduct`,
			FETCH_PRODUCT_MASTER: `${domain}/merchant/fetchproductmaster`,
			UPDATE_PRODUCT: `${domain}/merchant/updateproduct`,
			DELETE_PRODUCT: `${domain}/merchant/deleteproduct`,
			FETCH_INVENTORY_PRODUCT: `${domain}/merchant/fetchinventoryproduct`,
			FETCH_PRODUCT_LEVEL_INVENTORY: `${domain}/merchant/productlevelagg`,
			FETCH_WAREHOUSE_LEVEL_INVENTORY: `${domain}/merchant/warehouselevelagg`,
			FETCH_ITEM_LEVEL_INVENTORY: `${domain}/merchant/itemlevelagg`,
			FETCH_REVIEW_PRODUCT_DETAILS: `${domain}/merchant/fetchReviewProductDetails`,
			FETCH_PRODUCTS_LIST: `${domain}/merchant/listproduct`,
			ADD_PRODUCT_ITEM: `${domain}/merchant/additem`,
			UPDATE_PRODUCT_ITEM: `${domain}/merchant/updateitem`,
		},
		SAVE_REVIEW_CHANGES: `${domain}/product/saveReviewChanges`,
		BULK_PRODUCT_PUBLISH: `${domain}/product/publishbulkproducts`,
		FETCH_PUBLISH_HISTORY: `${domain}/product/fetchpublishhistory`,
		FETCH_PRODUCT_CHANGES: `${domain}/product/fetchproductchanges`,
		CHECK_PRODUCT_FIELDS: `${domain}/product/checkMissingFields`,
		FETCH_PUBLISH_PRODUCT_STATUS: `${domain}/product/publishproductstatus`,
		FETCH_LIST_OF_TASKS: `${domain}/product/fetchTaskList`,
		ADD_VENDOR: `${domain}/product/addvendor`,
	},
	VENDOR: {
		FETCH_SOURCE: `${domain}/vendor/fetchsource`,
		ADD_VENDOR: `${domain}/vendor/addvendor`,
		FETCH_VENDOR: `${domain}/vendor/fetchvendor`,
		UPDATE_VENDOR: `${domain}/vendor/updatevendor`,
		DELETE_VENDOR: `${domain}/vendor/deletevendor`,
		ADD_PRODUCT: `${domain}/vendor/addproduct`,
		FETCH_ITEM_LOOKUP: `${domain}/vendor/fetchitemlkp`,
		SEARCH_VENDOR: `${domain}/vendor/searchvendor`,
		ADD_PRODUCT: `${domain}/vendor/addproduct`,
		FETCH_PRODUCT: `${domain}/vendor/fetchProduct`,
		FETCH_VENDOR_ITEM: `${domain}/vendor/fetchVendorItems`,
	},
	ORG: {
		FETCH: `${domain}/org/fetch`,
	},
	SHOPIFY: {
		AUTH: `${domain}/shopify/auth`,
		SYNC_PRODUCT: `${domain}/shopify/productsync`,
		FETCH_ITEM: `${domain}/channel/fetchitem`,
		FETCH_ITEM_LOOKUP: `${domain}/channel/fetchitemlkp`,
		WAREHOUSE_SYNC: ` ${domain}/shopify/warehousesync`,
	},
	CHANNEL: {
		FETCH_CHANNEL: `${domain}/channel/fetchchannel`,
		FETCH_CONNECTED_APPS: `${domain}/channel/fetchconnectedapps`,
	},
	THIRD_PARTY: {
		FETCH_APPS: `${domain}/thirdparty/fetchapps`,
		FETCH_APPLINE: `${domain}/thirdparty/fetchappline`,
	},
	WAREHOUSE: {
		// FETCH_LKP: `${domain}/warehouse/fetchlkp`,
		FETCH_WAREHOUSE: `${domain}/warehouse/fetchwarehouse`,
		FETCH_OP_LKP: `${domain}/warehouse/fetchoplkp`,
		ADD_WAREHOUSE: `${domain}/warehouse/addwarehouse`,

		FETCH_WAREHOUSE: `${domain}/warehouse/fetchwarehouse`,
		SEARCH_WAREHOUSE: `${domain}/warehouse/searchwarehouse`,
	},
	ADDRESS: {
		CREATE: `${domain}/address/create`,

		FETCH: `${domain}/address/fetch`,
		UPDATE: `${domain}/address/update`,
		DELETE: `${domain}/address/delete`,
	},
	INVENTORY: {
		QUANTITY_ADJUST: `${domain}/inventory/quantityadjust`,
		ADD_INVENTORY: `${domain}/inventory/addinventory`,
		UPDATE_INVENTORY: `${domain}/inventory/updateinventory`,
		FETCH_INVENTORY: `${domain}/inventory/fetchinventory`,
	},
	PURCHASE_ORDER: {
		CREATE_PURCHASE_ORDER_ID: `${domain}/purchase_order/createPurchaseOrderId`,

		CREATE_PURCHASE_ORDER: `${domain}/purchase_order/createPurchaseOrder`,
		FETCH_PURCHASE_ORDER: `${domain}/purchase_order/fetchPurchaseOrder`,
		DELETE_PURCHASE_ORDER: `${domain}/purchase_order/deletePurchaseOrder`,

		UPDATE_PURCHASE_ORDER: `${domain}/purchase_order/updatePurchaseOrder`,
		FETCH_PURCHASE_ORDERS: `${domain}/purchase_order/fetchPurchaseOrders`,
	},
	WOOCOMMERCE: {
		ADD_CREDENTIALS: `${domain}/woocommerce/addcredentials`,
	},
};

export const {
	MERCHANT,
	PRODUCT,
	SHOPIFY,
	CHANNEL,
	THIRD_PARTY,
	ADDRESS,
	ORG,
	VENDOR,
	WAREHOUSE,
	INVENTORY,
	PURCHASE_ORDER,
	WOOCOMMERCE,
} = API_URL;
export default API_URL;

/**
 * 
 * 1. WAREHOUSE

https://ecom.hivepath.io/api/shopify/warehousesync
{
 
    "shop":"hivepath-test-store",
    "user_id": "123"
}


https://ecom.hivepath.io/api/vendor/fetchsource
GET
https://ecom.hivepath.io/api/org/fetch
GET

2. ADDRESS

https://ecom.hivepath.io/api/address/create
POST
{
    "address_id": "amazon_fba",
    "address_1": "amazon",
    "city": "palghat",
    "state": "kerala",
    "country ": "india",
    "org_id": 1
}


https://ecom.hivepath.io/api/address/fetch
POST
{
    "address_id": "138943752503131951"
}


https://ecom.hivepath.io/api/address/update
POST
{
    "address_1": "flipkart",
    "address_id": "138943752503131951",
    "city": "palghat",
    "country ": "india",
    "org_id": 1,
    "state": "kerala"
}

https://ecom.hivepath.io/api/address/delete
POST
{
    "address_id":"138943752503131951"
}


3. VENDOR

https://ecom.hivepath.io/api/vendor/addvendor
POST
{
    "merchant_id":"123",
    "vendor_first_name": "vendor",
    "vendor_last_name":"test1",
    "address_id": "138940404851533770",
    "vendor_phone_number": "9876543210",
    "vendor_email_id": "test1@gmail.com",
    "source_id":1
}

https://ecom.hivepath.io/api/vendor/fetchvendor
POST
{
    "merchant_id":"123" or "vendor_id":<vendor_id>
}

https://ecom.hivepath.io/api/vendor/updatevendor
POST
{
    "address_id": "138940404851533770",
    "merchant_id": "123",
    "source_id": 1,
    "vendor_email_id": "test1@gmail.com",
    "vendor_first_name": "vendor",
    "vendor_id": "138943742973668956",
    "vendor_last_name": "test0",
    "vendor_phone_number": "9876543210"
}

https://ecom.hivepath.io/api/vendor/deletevendor
POST
{
    "vendor_id": "138943742973668956"
}

https://ecom.hivepath.io/api/warehouse/fetchlkp
POST
{
    "user_id":"123"
}

https://ecom.hivepath.io/api/warehouse/fetchoplkp
POST
{
    "operator_id":"138943756086094860"
}
 * 
 * 
 */

/**
 * 1. Service to add product by merchant
https://ecom.hivepath.io/api/merchant/addproduct
POST
{
    "user_id": "138940023846722390",
    "product_id":"238940023846722399",
    "product_desc": "test product desc",
    "product_title": "Baggy Pant",
    "status": "draft",
    "channel_id": 3,
    "unit_retail_price": 145,
    "unit_cost_price": 145,
    "items": [
        {
            "item_title": "L/Black",
            "item_desc": "test desc",
            "barcode": "000",
            "inventory": [
                {
                    "wh_id": "75970904346",
                    "available": 100
                }
            ]
        },
        {
            "item_title": "M/Black",
            "item_desc": "test desc",
            "barcode": "000",
            "inventory": [
                {
                    "wh_id": "75970904346",
                    "available": 50
                },
                {
                    "wh_id": "77204914458",
                    "available": 50
                }
            ]
        }
    ],
    "weight": 100,
    "weight_unit":"gm",
    "display_image": "testimage",
    "images": [
        "testimage1",
        "testimage2"
    ]
}

Result
{
    "message": "Successfully added",
    "status": "success"
}

2. service to push product to shopify
https://ecom.hivepath.io/api/shopify/addproduct
POST
{
    "shop":"hivepath-test-store",
    "user_id":"138940023846722390",
    "master_product_id":"238940023846722399"
}
Result
{
    "message": "product added to shopify",
    "status": "success"
}

3. Service to create vendor
https://ecom.hivepath.io/api/vendor/addvendor
POST
{
    "address1": "test address1",
    "address2": "test address2",
    "city": "city",
    "company_name": "test",
    "contact_name": "vendor",
    "contact_phone_number": "9876543210",
    "country": "india",
    "email_id": "test1@gmail.com",
    "online_order_portal": "154356",
    "payment_method": "card",
    "payment_terms": "blah blah",
    "phone_number": "9876543210",
    "state": "kerala",
    "user_id": "138940023846722390",
    "username": "test",
    "vendor_id": "138946252906251548",
    "vendor_leadtime": "45",
    "vendor_restock_time": "45",
    "website_link": "dds",
    "zipcode": "6548236"
}

Result
{
    "message": "Successfully registered",
    "result": {
        "address1": "test address1",
        "address2": "test address2",
        "city": "city",
        "company_name": "test",
        "contact_name": "vendor",
        "contact_phone_number": "9876543210",
        "country": "india",
        "email_id": "test1@gmail.com",
        "online_order_portal": "154356",
        "payment_method": "card",
        "payment_terms": "blah blah",
        "phone_number": "9876543210",
        "state": "kerala",
        "user_id": "138940023846722390",
        "username": "test",
        "vendor_id": "138946255380553830",
        "vendor_leadtime": 45,
        "vendor_restock_time": 45,
        "website_link": "dds",
        "zipcode": "6548236"
    },
    "status": "success"
}
 */

/**
 * 1. Service to add product to vendor

https://ecom.hivepath.io/api/vendor/addproduct
POST

{
    "vendor_id": "138946255380553830",
    "master_product_id": "8071078904090",
    "master_item_id": "44320351355162",
    "unit_cost": 150,
    "moq": 12,
    "min_inventory": "25",
    "max_inventory": "1000",
    "lead_time_in_days": "15",
    "product_title": "90s Baggy High Jeans",
    "product_desc": "test desc"
}

Result

{
    "message": "Successfully added",
    "status": "success"
}

2. Service to fetch items

https://ecom.hivepath.io/api/vendor/fetchitemlkp
POST
{
    "vendor_id":"138946255380553830"
}

{
    "result": [
        {
            "lead_time_in_days": "15",
            "master_item_id": "44320351355162",
            "master_product_id": "8071078904090",
            "max_inventory": "1000",
            "min_inventory": "25",
            "moq": "12",
            "product_desc": "test desc",
            "product_title": "90s Baggy High Jeans",
            "unit_cost": 150.0,
            "vendor_id": "138946255380553830"
        }
    ],
    "status": "success"
}

3. Service to fetch product lkp

https://ecom.hivepath.io/api/vendor/fetchproductlkp
POST
{
    "master_item_id": "44320351355162"
}

{
    "result": [
        {
            "master_item_id": "44320351355162",
            "master_product_id": "8071078904090",
            "vendor_id": "138946255380553830",
            "vendor_item_id": "44320351355162",
            "vendor_product_id": "8071078904090"
        }
    ],
    "status": "success"
}

4. Service to fetch currency dimensions

https://ecom.hivepath.io/api/currencydim
GET

5. Service to create purchase order
https://ecom.hivepath.io/api/purchase_order/create
POST
{
    "po_id": "",
    "vendor_id": "138946252906251548",
    "warehouse_id": "75970904346",
    "cancel_date": "",
    "promise_date": "",
    "status": "draft",
    "item_id": "44393781985562",
    "product_id": "8071078740250",
    "qty_ordered": 50,
    "unit_cost": 200,
    "total_cost": 10000,
    "currency_id": 12
}

Result
{
    "message": "Successfully created",
    "status": "success"
}


6. Service to fetch purchase order
https://ecom.hivepath.io/api/purchase_order/fetch
POST
{
    "user_id": <user id> or "vendor_id:<vendor id> or <"po_id": <po id>
}

Result
{
    "result": [
        {
            "cancel_date": "",
            "currency": "INR",
            "currency_id": 12,
            "item_id": "44320351355162",
            "po_id": "138947081044519543",
            "po_line_id": "138947081044519542",
            "product_id": "8071078904090",
            "promise_date": "",
            "qty_ordered": 100.0,
            "status": "draft",
            "symbol": "₹",
            "total_cost": 250000.0,
            "unit_cost": 2500.0,
            "vendor_id": "138946255380553830",
            "warehouse_id": "75970904346"
        },
        {
            "cancel_date": "",
            "currency": "INR",
            "currency_id": 12,
            "item_id": "44393781985562",
            "po_id": "138947136297054544",
            "po_line_id": "138947136297054543",
            "product_id": "8071078740250",
            "promise_date": "",
            "qty_ordered": 50.0,
            "status": "draft",
            "symbol": "₹",
            "total_cost": 10000.0,
            "unit_cost": 200.0,
            "vendor_id": "138946255380553830",
            "warehouse_id": "75970904346"
        },
        {
            "cancel_date": "",
            "currency": "INR",
            "currency_id": 12,
            "item_id": "44393781985562",
            "po_id": "138947137128765115",
            "po_line_id": "138947137128765114",
            "product_id": "8071078740250",
            "promise_date": "",
            "qty_ordered": 50.0,
            "status": "draft",
            "symbol": "₹",
            "total_cost": 10000.0,
            "unit_cost": 200.0,
            "vendor_id": "138946252906251548",
            "warehouse_id": "75970904346"
        }
    ],
    "status": "success"
}

7. Service to update purchase order
https://ecom.hivepath.io/api/purchase_order/update
POST
{
    "cancel_date": "",
    "currency": "INR",
    "currency_id": 12,
    "item_id": "44320351355162",
    "po_id": "138947081044519543",
    "po_line_id": "138947081044519542",
    "product_id": "8071078904090",
    "promise_date": "",
    "qty_ordered": 150.0,
    "status": "sent",
    "symbol": "₹",
    "total_cost": 250000.0,
    "unit_cost": 2500.0,
    "vendor_id": "138946255380553830",
    "warehouse_id": "75970904346"
}

Result
{
    "message": "Successfully updated",
    "status": "success"
}
 * 
 * 
 * 
 * 1. Service to update product
https://ecom.hivepath.io/api/merchant/updateproduct
POST
{
        "barcode": "",
        "channel_id": 3,
        "item_desc": "update test item desc",
        "item_title": "test title",
        "live_date": "2023-01-24T12:59:02.699808",
        "master_item_id": "138938579426998083",
        "master_product_id": "138938579426998082",
        "product_desc": "test prod des",
        "product_title": "",
        "status": "active",
        "unit_retail_price": "145sdd"
    }

2. Service to delete product

https://ecom.hivepath.io/api/merchant/deleteproduct
POST
{
    "master_item_id": "138938579426998083",
    "master_product_id": "138938579426998082"
}

3. service to add variant
https://ecom.hivepath.io/api/merchant/additem
POST
{
    "user_id":"138940023846722390",
    "master_product_id": "8071078904090",
    "item_desc": "",
    "item_title": "Test",
    "option_name": [
        "colour",
        "size"
    ],
    "option_value": [
        "black",
        "s"
    ]
}

4. Service to update item

https://ecom.hivepath.io/api/merchant/updateitem
POST
{
    "user_id":"138940023846722390",
    "master_product_id": "8071078904090",
    "master_item_id":"138961811542017730",
    "item_desc": "",
    "item_title": "Test gf",
    "option_name": [
        "colour",
        "size"
    ],
    "option_value": [
        "blue",
        "s"
    ]
}

5. Service to delete item
https://ecom.hivepath.io/api/merchant/deleteitem
POST
{
    "user_id": "138940023846722390",
    "master_product_id": "8071078904090",
    "master_item_id": "138961811542017730"
}
 * 
 * 
 * 
 * 
 */
