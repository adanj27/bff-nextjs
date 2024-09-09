import { NextRequest, NextResponse } from 'next/server';
import { getDashboardData } from '@/services/bffService';

export async function GET(request: NextRequest) {
  try {
    const dashboardData = await getDashboardData();
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error in BFF API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}