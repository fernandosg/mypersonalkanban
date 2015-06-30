class Post < ActiveRecord::Base
	attr_accessor :backup_member
	belongs_to :member
	before_save :check_if_exists,:update_user_id

	def update_user_id
		self.member_id=Member.find_by_username(backup_member).id
	end

	def self.restore_backup username
		list=Post.where(:member_id=>Member.find_by_username(username).id)
		array_of_columns=Hash.new
		arrays_of_posts=Array.new
		list.each do |element|
			arrays_of_posts.push(element)
			array_of_columns["column#{element.column.to_s}"]=arrays_of_posts
		end
		array_of_columns
	end

	def check_if_exists
		if Post.exists?(:post_id=>self.post_id)
			false
		end
	end
end
