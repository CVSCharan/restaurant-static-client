import Script from "next/script";

export default function GoogleReviewsComp() {
  return (
    <div>
      <h1>Customer Reviews</h1>
      <div
        className="elfsight-app-43d6f5c4-e329-4dcd-b9d8-c956d5a6ce77"
        data-elfsight-app-lazy
      ></div>
      {/* Load the Elfsight platform script */}
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="lazyOnload" // Ensures script loads after the main content
      />
    </div>
  );
}
