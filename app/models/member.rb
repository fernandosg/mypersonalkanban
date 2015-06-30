class Member < ActiveRecord::Base
	def self.verificate_account username, password
		Member.exists?(:username=>username,:password=>password)
	end
end
