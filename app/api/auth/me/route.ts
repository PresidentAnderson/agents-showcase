import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // In production, you would validate the JWT token
    // For demo purposes, we'll decode the simple token
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8')
      const [email] = decoded.split(':')
      
      // Mock user data based on email
      const user = {
        id: '1',
        name: email === 'demo@example.com' ? 'Demo User' : 'User',
        email: email,
        role: 'user'
      }

      return NextResponse.json(
        { 
          success: true,
          user: user
        },
        { status: 200 }
      )
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}