# Subscriptions

Provides Subscription functionality with Stripe (Braintree and PayPal to come) as the provider.

### Stripe

- create customer
- add card to customer (via iframe)
- get list of customer cards
- set default customer card
- delete customer card

- create subscriptions plan in api and connect to Stripe plans
- get list of subscription plans and prices
- create subscription for customer with metadata

- webhook for customer.subscription.created
- webhook for customer.subscription.deleted
- webhook for customer.subscription.updated
