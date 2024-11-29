# Github URL
  [click to view code in my github](https://github.com/indranilmondal901/thrd_clothing_assignment)
# Deployed URL
  [click to view the demo](https://thrd-clothing-assignment-indranilmondal901s-projects.vercel.app/)

# E-Commerce React Application

## Implementation Details:

### Approach:
  - The application is built using React to create a dynamic and interactive e-commerce platform.
  - *"papaparse"* is used to parse CSV files and load Data.
  - *"bootstrap"* is used for styling purposes.
  - *"swiper"* is used for carosal effect.
  - Components are created in a modular fashion to ensure reusability and maintainability.
  - State management is handled using React's `useState` hook.
  - Side effects, such as filtering products and updating the cart, are managed using `useEffect`.

### Product Display Logic:
  - **Product Data Source**:
    - Products are fetched from a CSV file that contains all available products.
    - The purchase history of each user is tracked using their `userID` to filter previously purchased products.
    - The list of products is dynamically ordered by placing **not purchased** products first, followed by **purchased** products.
    - This dynamic ordering ensures that the most relevant products (not purchased yet) are always shown first.

  - **HomePage**:
    - On login, the app fetches the user’s purchase history by filtering the products based on their `userID`.And based on the previous purchased category **handpicked products** are shown.
    - **Not purchased products** are listed after that and shown in carosal as **Explore Our Store**.
    - The products are displayed in two sections:
      - **Hand-picked Recommendations**: Displayed from the `recomandedProducts` list.
      - **Explore Our Store**: Displays a swiper carousel of products that have not been purchased.
      
    - This order is achieved using the following approach:
      - The list is filtered by comparing the `userID` with the purchase history.
      - Products that are not purchased are dynamically placed at the beginning of the list, followed by the purchased products.
      - The final product list is a combination of both: **`[...notPurchased, ...purchased]`**.

  - **ProductPage**:
    - Filters are available for searching products by name, category, and price range.
    - After applying filters, the products are dynamically updated and displayed in the correct order (not purchased first, purchased last).

  - **CartPage**:
    - Products added to the cart are displayed with options to modify the quantity or remove them.
    - Cart contents are updated in real-time when products are added, removed, or their quantities change.
    - The total price is recalculated and displayed based on the cart data.

### Additional Features:
  - **Swiper Carousel**:
    - Integrated a swiper carousel to display rotating product selections, providing an engaging user experience.
    - The carousel is built using the `Swiper` component, supporting free mode, autoplay, and pagination features.

  - **User Authentication**:
    - Differentiates between logged-in users and guests.
    - Logged-in users receive personalized product recommendations, while guests are shown a welcome section with a sign-up prompt.

  - **Filter Reset**:
    - Filters are available for searching products by name, category, and price range.
    - Includes a "Clear All" button to reset the search, category, and price range filters, allowing users to start with a fresh product list.

  - **Responsive Design**:
    - The layout is responsive, ensuring a consistent user experience across different screen sizes, such as desktop, tablet, and mobile.

  - **Product Data Management**:
    - Product data is managed locally using React state hooks (`useState`).
    - In a production environment, this would be replaced with API calls to fetch data from a backend or third-party service.

  - **Lazy Loading**:
    - Implemented lazy loading for product images and other content to enhance page load time and performance.
    - Images are loaded only when they come into the viewport, reducing initial page load time and saving bandwidth.
