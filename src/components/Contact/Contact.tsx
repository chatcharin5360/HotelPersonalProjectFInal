function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-light mb-8 uppercase text-center mt-24">
        Contact-Us
      </h2>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-2xl font-bold mb-2">WE ARE HERE FOR YOU</h2>
        <p className="text-gray-600 mb-6">
          At Luxury Hotels, we take our customers seriously. Do you have any
          enquiries, complaints, or requests? Please forward it to our support
          desk, and we will get back to you as soon as possible.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <p className="text-lg font-medium">
              497 Evergreen Rd. Roseville, CA 95673
            </p>
            <a
              href="#"
              className="font-bold flex items-center text-black mt-3 hover:underline"
            >
              View map <span className="ml-2">&rarr;</span>
            </a>
            <p className="mt-4">Phone: +44 345 678 903</p>
            <p>Email: luxury_hotels@gmail.com</p>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-32"></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#d2a679] text-white px-4 py-2 rounded hover:bg-[#c29669]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
