import React, { useState, useEffect } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { policyService } from "../../services/api/policyService";

const Policy = () => {
    const [policy, setPolicy] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPolicies = async () => {
            setLoading(true);
            try {
                const res = await policyService.getPolicies();
                const list = Array.isArray(res) ? res : res.data;

                const grouped = list.reduce((acc, item) => {
                    const category = item.categoryPolicyId?.title || "Khác";
                    if (!acc[category]) acc[category] = [];
                    acc[category].push({
                        policyId: item._id,
                        content: item.content
                    });
                    return acc;
                }, {});

                setPolicy(grouped);
            } catch (error) {
                console.error("Error fetching policies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    return (
        <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
            <Typography variant="h4" sx={{ mb: 3, color: '#388e3c' }}>
                Chính sách pháp lý
            </Typography>

            {loading ? (
                <Typography>Đang tải...</Typography>
            ) : Object.keys(policy).length === 0 ? (
                <Typography>Không có chính sách</Typography>
            ) : (
                Object.entries(policy).map(([category, items]) => (
                    <Box key={category} sx={{ mb: 5 }}>
                        <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                            {category}
                        </Typography>
                        {items.map(policy => (
                            <Box key={policy.policyId} sx={{ mb: 2 }}>
                                <Typography variant="body2">{policy.content}</Typography>
                            </Box>
                        ))}
                    </Box>
                ))
            )}
        </Box>
    );
};

export default Policy;