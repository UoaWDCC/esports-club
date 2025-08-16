# Testing
For testing, use Stripe's test mode and test card numbers (you can only use these in sandbox testing):

Test card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
In development please generate your own webhook secret for local development

stripe listen --forward-to localhost:3000/api/stripe/webhook