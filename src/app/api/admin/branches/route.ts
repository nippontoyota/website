import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/auth';
import { getStoreData, updateBranches } from '@/lib/server/db';
import { BranchLocation } from '@/lib/types/admin';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const store = await getStoreData();
    return NextResponse.json(store.branches);
  } catch (error) {
    console.error('Failed to get branches:', error);
    return NextResponse.json({ error: 'Failed to retrieve branches' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as BranchLocation;
    if (!body.name || !body.city || !body.phone) {
      return NextResponse.json({ error: 'Branch Name, City, and Phone are required' }, { status: 400 });
    }

    const store = await getStoreData();
    const newBranch: BranchLocation = {
      ...body,
      id: body.id || `branch-${Date.now().toString().slice(-5)}`,
    };

    store.branches.push(newBranch);
    await updateBranches(store.branches);

    return NextResponse.json({ success: true, branch: newBranch }, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to add branch:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add branch' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as BranchLocation;
    if (!body.id) {
      return NextResponse.json({ error: 'Branch ID is required' }, { status: 400 });
    }

    const store = await getStoreData();
    const index = store.branches.findIndex((b) => b.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
    }

    store.branches[index] = { ...store.branches[index], ...body };
    await updateBranches(store.branches);

    return NextResponse.json({ success: true, branch: store.branches[index] });
  } catch (error: unknown) {
    console.error('Failed to update branch:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update branch' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Branch ID is required' }, { status: 400 });
    }

    const store = await getStoreData();
    const filtered = store.branches.filter((b) => b.id !== id);
    await updateBranches(filtered);

    return NextResponse.json({ success: true, message: 'Branch deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete branch:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete branch' },
      { status: 500 }
    );
  }
}
