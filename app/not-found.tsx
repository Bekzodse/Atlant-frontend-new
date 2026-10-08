import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Страница не найдена</h2>
          <p className="text-gray-600 mb-6">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  )
}
