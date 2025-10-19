import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Demo authentication logic
    // In production, this would check against a database with hashed passwords
    if (email === 'demo@example.com' && password === 'password') {
      // Create a simple token (in production, use JWT or session management)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')
      
      const response = NextResponse.json(
        { 
          success: true,
          user: {
            id: '1',
            email: email,
            name: 'Demo User',
            role: 'user'
          },
          token: token
        },
        { status: 200 }
      )

      // Set HTTP-only cookie for the token
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })

      return response
    }

    // Invalid credentials
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}