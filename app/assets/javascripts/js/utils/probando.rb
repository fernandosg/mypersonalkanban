require "json"
def imprime
	ob=JSON.parse('{"column1":[{"id":1,"dataset":1,"title":"ahhhhmmm","description":"seee","column":1}]}')
	ob.keys.each do |llave|
		ob[llave].each do |elemento|
			puts elemento
		end
	end
end
imprime