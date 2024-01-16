export default function WhoAreWe() {
  return (
    <>
      <div className="px-2">
        <div className="flex flex-col bg-gray-100 rounded-lg px-5 pt-5 pb-3 mb-5 shadow-lg">
          <h1 className="text-center text-2xl font-bold my-4">Who Are We</h1>
          <div className="p-3">
            <div className="card bg-white rounded-lg px-6 py-4 shadow-lg mb-4">
              <p className="mb-4">👋🏼 🤖 We Are: Scrubgy, the Solar Panel Cleaning Robots! 🌞</p>
              <p className="mb-4">🔄 We make solar panel cleaning easy! Our robots glide over your panels, leaving them spotless and efficient.</p>
              <p className="mb-4">💲 Affordable Sustainability: Our cleaner is $850.00, with a $12.50/month subscription. Cancellation fees apply.</p>
              <p>Choose Scrubgy for hassle-free solar panel care! 🌿🌟</p>
            </div>
            <div className="card bg-white rounded-lg px-6 py-4 shadow-lg">
              <iframe width="100%" height="315" src="https://www.youtube.com/embed/dEgNTmSzwjc?si=yPceE9Z6O-uKsETL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
