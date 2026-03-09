/**
 * Integration tests for the SyncUser component to verify that authenticated
 * user sessions correctly trigger synchronization with the Spring Boot backend
 * using valid JWT tokens and user metadata.
 */
import { render, waitFor } from '@testing-library/react';
import { vi, expect, it, describe } from 'vitest';
import SyncUser from '@/components/auth/SyncUser';
import { useUser, useAuth } from '@clerk/nextjs';

describe('SyncUser Component', () => {
  it('sends user data to the backend when authenticated', async () => {
    const mockToken = 'test-token-123';

    vi.mocked(useUser).mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: {
        primaryEmailAddress: { emailAddress: 'stark@athlete.com' },
        fullName: 'Stark Athlete',
      },
    } as unknown as ReturnType<typeof useUser>);

    vi.mocked(useAuth).mockReturnValue({
      getToken: vi.fn().mockResolvedValue(mockToken),
    } as unknown as ReturnType<typeof useAuth>);

    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }))
      );

    render(<SyncUser />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/users/sync'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
          body: JSON.stringify({
            email: 'stark@athlete.com',
            name: 'Stark Athlete',
          }),
        })
      );
    });
  });
});
