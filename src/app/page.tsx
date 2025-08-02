export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            一段読書 v3
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            推薦型読書体験プラットフォーム
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <p className="text-gray-700 mb-6">
              本は読みたいけど時間がない、何の本を読めばよいか分からない...
              そんなあなたに最適な読書体験をお届けします。
            </p>
            <a 
              href="/onboarding"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              読書を始める
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}