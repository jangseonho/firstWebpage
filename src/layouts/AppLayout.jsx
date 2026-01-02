// header + menu + Outlet
import { Link, Outlet, useNavigate } from 'react-router'
import { AppBar, Box, Toolbar, Typography, Container, Stack, Button } from '@mui/material'
import { BiGhost } from "react-icons/bi";
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';
import { clearAuth } from '../api/authApi';

function AppLayout() {
    const queryClient = useQueryClient();
    const { data: me, isLoading: meIsLoading } = useMe();
    const navigate = useNavigate();

    // 로그아웃 이벤트 핸들러
    const handleLogout = () => {
        clearAuth(); // 로그아웃(토큰삭제용)
        queryClient.setQueryData(["me"], null); // 즉시 업데이트
        navigate("/posts"); // 전체를 새로고침하는게 아니라 페이지만 바꿔야함.
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fdeccdff' }}>
            <AppBar position='fixed' color='transparent'>
                <Container maxWidth='md'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box component={Link} to="/posts" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'orange' }}>
                            {/* font-icon */}
                            <Box sx={{
                                width: 40, height: 40,
                                borderRadius: '50%', // 둥근 모서리 
                                bgcolor: 'red',
                                display: 'grid', // 바둑판 형태의 레이아웃 스타일
                                placeItems: 'center',
                                mr: 1.5
                            }}>
                                <BiGhost style={{ color: 'orange', fontSize: 20 }} />
                            </Box>
                            <Typography variant='h6' component="h1" sx={{ fontWeight: 700 }}>
                                게시판
                            </Typography>
                        </Box>
                        {/* 회원가입 / 로그인 */}
                        <Stack direction="row" spacing={1.5} alignItems='center'>
                            {!meIsLoading && me ? (
                                <Button variant='text' sx={{ color: '#9c17d1ff' }} onClick={handleLogout}>로그아웃</Button>
                            ) : (
                                <>
                                    <Button component={Link} to="/auth/login" variant='text' sx={{ color: 'orange' }} >로그인</Button>
                                    <Button component={Link} to="/auth/register" variant='text' sx={{ color: 'orange' }} >회원가입</Button>
                                </>
                            )
                            }
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth='md' component="main" sx={{ pt: 10, mb: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default AppLayout;