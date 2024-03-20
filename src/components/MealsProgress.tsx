export default function MealsProgress() {
  return (
    <h1>MealsProgres</h1>
  );
}
/*
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface MealsProgressProps {
  finish: boolean;
}
function MealsProgress({ finish }: MealsProgressProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (finish) {
      navigate(`/meals/${id}/completed`);
    } else {
      console.log('Receita em andamento');
    }
  }, [finish, id, navigate]);

  return (
    <div>
      <h1>Detalhes da Receita em Andamento</h1>
    </div>
  );
}
export default MealsProgress;

*/
