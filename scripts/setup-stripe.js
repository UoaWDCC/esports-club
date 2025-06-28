const Stripe = require("stripe");

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil",
});

async function setupStripeProducts() {
    try {
        console.log("Setting up Stripe products and prices...\n");

        // Create 1 Semester Plan product
        const oneSemesterProduct = await stripe.products.create({
            name: "1 Semester Plan",
            description: "Access to all esports club activities for one semester",
            metadata: {
                type: "membership",
                duration: "1_semester",
            },
        });

        console.log("✅ Created 1 Semester Plan product:", oneSemesterProduct.id);

        // Create price for 1 Semester Plan
        const oneSemesterPrice = await stripe.prices.create({
            product: oneSemesterProduct.id,
            unit_amount: 5000, // $50.00 in cents
            currency: "nzd",
            metadata: {
                type: "membership",
                duration: "1_semester",
            },
        });

        console.log("✅ Created 1 Semester Plan price:", oneSemesterPrice.id);

        // Create 2 Semester Plan product
        const twoSemesterProduct = await stripe.products.create({
            name: "2 Semester Plan",
            description: "Access to all esports club activities for two semesters",
            metadata: {
                type: "membership",
                duration: "2_semester",
            },
        });

        console.log("✅ Created 2 Semester Plan product:", twoSemesterProduct.id);

        // Create price for 2 Semester Plan
        const twoSemesterPrice = await stripe.prices.create({
            product: twoSemesterProduct.id,
            unit_amount: 9000, // $90.00 in cents
            currency: "nzd",
            metadata: {
                type: "membership",
                duration: "2_semester",
            },
        });

        console.log("✅ Created 2 Semester Plan price:", twoSemesterPrice.id);

        console.log("\n🎉 Stripe setup completed successfully!");

        console.log("\n📝 Next steps:");
        console.log("1. Create membership types in your database with matching names:");
        console.log('   - "1 Semester Plan"');
        console.log('   - "2 Semester Plan"');
        console.log("2. Set up a webhook endpoint in your Stripe dashboard pointing to:");
        console.log("   https://your-domain.com/api/stripe/webhook");
        console.log("3. Add the webhook secret to your environment variables");
        console.log("4. The pricing page will automatically fetch prices from Stripe!");
    } catch (error) {
        console.error("❌ Error setting up Stripe:", error);
    }
}

// Run the setup
setupStripeProducts();
