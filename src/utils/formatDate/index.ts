const formatDate = (dataString: string): string => {
  const data = new Date(dataString)

  return data.toLocaleString('pt-BR')
}

export { formatDate }
