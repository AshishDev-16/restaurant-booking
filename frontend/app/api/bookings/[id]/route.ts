import { NextResponse } from 'next/server'

const BACKEND_URL = 'http://localhost:5000/api/bookings'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${BACKEND_URL}/${params.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const data = await response.json()
      return NextResponse.json(
        { message: data.message || 'Failed to delete booking' },
        { status: response.status }
      )
    }

    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 