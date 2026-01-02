import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../../api/authApi";

// 회원가입
function RegisterPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        nickname: "",
        password: "",
        rePassword: ""
    });

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => navigate("/posts") // 성공하면 첫페이지로 이동. 근데 새로고침하면 안되니까 navigate 훅을 써서 옮겨주는거임.
    });

    // 이벤트 핸들러
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        // setForm으로 업데이트 시켜줌
        // form은 객체임.
        // ...prev : 중복되지 않는 것들은 살려두는? 스프레드 연산자.
        setForm((prev) => ({ ...prev, [name]: value })); // 이전 상태 복사 후 변경된 필드만 업데이트
    }

    // 데이터 전송
    const handleSubmit = (evt) => {
        evt.preventDefault(); // 이걸로 새로고침되는거 막는거.

        // 비밀번호 검증은 프론트에서 확인해야함.
        if (form.password !== form.rePassword) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
            return;
        }
        // AuthAPI에서 받는거랑 같은 순서를 받아야함. 
        registerMutation.mutate({
            email: form.email.trim(), // trim으로 양끝 여백 제거
            password: form.password, //패스워드는 왜 trim을 안할까?
            nickname: form.nickname.trim()
        })
    }

    return (
        <Container maxWidth="sm">

            <Paper sx={{
                width: '100%',
                borderRadius: 3,
                p: 4,
                boxShadow: '0, 16px, 45px, rgba(177, 176, 176, 0.06)'
            }}>

                <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 3 }}> REGISTER </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField type="email" label="이메일" name="email" size="small" fullWidth placeholder="test@test.com" required value={form.email} onChange={handleChange} />
                        <TextField type="text" label="별명" name="nickname" size="small" fullWidth placeholder="홍길동동동" required value={form.nickname} onChange={handleChange} />
                        <TextField type="password" label="비밀번호" name="password" size="small" fullWidth required value={form.password} onChange={handleChange} />
                        <TextField type="password" label="비밀번호 확인" name="rePassword" size="small" fullWidth required value={form.rePassword} onChange={handleChange} />

                        {
                            registerMutation.isError &&
                            <Typography variant="body2" color="error">회원 가입에 실패했습니다.</Typography>
                        }
                        <Button type="submit" variant="contained" sx={{ mt: 1, py: 1.2, borderRadius: 2, textTransform: "none", "&:hover": { backgroundColor: "#999" } }} disabled={registerMutation.isPending}>{registerMutation.isPending ? "회원가입 중..." : "회원가입"}</Button>
                    </Stack>
                </Box>

            </Paper>

        </Container>
    );
}

export default RegisterPage;