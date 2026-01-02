import { Box, Container, Paper, Stack, Typography, TextField, Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { login, setAuth } from '../../api/authApi';

function LoginPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: login, // authApi에 있는 함수
        onSuccess: async (data) => {
            setAuth(data); // 토큰 localStorage 저장
            await queryClient.invalidateQueries({ queryKey: ["me"] }); // 토큰 저장되기 전에 이게 먼저 실행되면 안되니까 await 꼭 붙여야함!
            navigate("/posts");
        }
    });

    // 이벤트 핸들러
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget); // target은 내가 누른 걔인거고, currentTarget은 이벤트핸들러가 걸려있는애를 말하는 것임
        loginMutation.mutate({
            email: String(formData.get("email")).trim(),
            password: String(formData.get("password")) // get("password") 요기서는 name의 속성을 가지고 오는 것
        });
    }

    return (
        <Container maxWidth="sm">
            <Paper sx={{
                width: '100%',
                borderRadius: 3,
                p: 4,
                boxShadow: '0, 16px, 45px, rgba(177, 176, 176, 0.06)'
            }}>
                <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 3 }}> LOGIN </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField type="email" label="이메일" name="email" size="small" fullWidth placeholder="test@test.com" required />
                        <TextField type="password" label="비밀번호" name="password" size="small" fullWidth required />

                        {
                            loginMutation.isError && (
                                <Typography variant="body2" color="error">로그인에 실패했습니다.</Typography>
                            )
                        }
                        <Button type="submit" variant="contained" sx={{ mt: 1, py: 1.2, borderRadius: 2, textTransform: "none", "&:hover": { backgroundColor: "#999" } }} disabled={loginMutation.isPending} >{loginMutation.isPending ? "로그인 중..." : "로그인"}</Button>
                    </Stack>
                </Box>

            </Paper>

        </Container>
    );
}

export default LoginPage;