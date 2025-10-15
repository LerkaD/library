from django.core.management.base import BaseCommand
from api.models import Author, AuthorProfile
from datetime import date

class Command(BaseCommand):
    help = 'Load author profiles into database'

    def handle(self, *args, **options):
        
        author_profiles_data = [
            {
                "author_name": "George Orwell",
                "biography": "Eric Arthur Blair, known by his pen name George Orwell, was an English novelist, essayist, journalist, and critic. His work is characterised by lucid prose, social criticism, opposition to totalitarianism, and support of democratic socialism. Orwell's most famous works include '1984' and 'Animal Farm', which have had a profound influence on popular and political culture."
            },
            {
                "author_name": "Jane Austen",
                "biography": "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century. Austen's plots often explore the dependence of women on marriage in the pursuit of favourable social standing and economic security."
            },
            {
                "author_name": "J.K. Rowling",
                "biography": "Joanne Rowling, known by her pen name J.K. Rowling, is a British author and philanthropist. She wrote Harry Potter, a seven-volume children's fantasy series published from 1997 to 2007. The series has sold over 500 million copies, been translated into 80 languages, and spawned a global media franchise including films and video games."
            },
            {
                "author_name": "J.R.R. Tolkien",
                "biography": "John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic. He was the author of the high fantasy works The Hobbit and The Lord of the Rings. He served as the Rawlinson and Bosworth Professor of Anglo-Saxon and Fellow of Pembroke College at the University of Oxford."
            },
            {
                "author_name": "Stephen King",
                "biography": "Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. His books have sold more than 350 million copies, and many have been adapted into films, television series, miniseries, and comic books. King has published 64 novels, including seven under the pen name Richard Bachman."
            },
            {
                "author_name": "Agatha Christie",
                "biography": "Agatha Christie was an English writer known for her 66 detective novels and 14 short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple. She also wrote the world's longest-running play, The Mousetrap. Guinness World Records lists Christie as the best-selling fiction writer of all time."
            },
            {
                "author_name": "Ernest Hemingway",
                "biography": "Ernest Miller Hemingway was an American novelist, short-story writer, journalist, and sportsman. His economical and understated style had a strong influence on 20th-century fiction, while his life of adventure and his public image influenced later generations. Hemingway published seven novels, six short-story collections, and two non-fiction works."
            },
            {
                "author_name": "F. Scott Fitzgerald",
                "biography": "Francis Scott Key Fitzgerald was an American novelist, essayist, screenwriter, and short-story writer. He is best known for his novels depicting the flamboyance and excess of the Jazz Age—a term he popularized. During his lifetime, he published four novels, four story collections, and 164 short stories."
            },
            {
                "author_name": "Leo Tolstoy",
                "biography": "Count Lev Nikolayevich Tolstoy, usually referred to in English as Leo Tolstoy, was a Russian writer who is regarded as one of the greatest authors of all time. He received nominations for the Nobel Prize in Literature every year from 1902 to 1906 and for the Nobel Peace Prize in 1901, 1902, and 1909."
            },
            {
                "author_name": "Mark Twain",
                "biography": "Samuel Langhorne Clemens, known by his pen name Mark Twain, was an American writer, humorist, entrepreneur, publisher, and lecturer. He was lauded as the 'greatest humorist the United States has produced', and William Faulkner called him 'the father of American literature'. His novels include The Adventures of Tom Sawyer and its sequel, Adventures of Huckleberry Finn."
            },
        ]

        created_count = 0
        updated_count = 0

        for profile_data in author_profiles_data:
            try:
                author = Author.objects.get(name=profile_data["author_name"])
                
                profile, created = AuthorProfile.objects.get_or_create(
                    author=author,
                    defaults={"biography": profile_data["biography"]}
                )
                
                if not created:
                    profile.biography = profile_data["biography"]
                    profile.save()
                    updated_count += 1
                    self.stdout.write(f'Updated profile for: {profile_data["author_name"]}')
                else:
                    created_count += 1
                    self.stdout.write(f'Created profile for: {profile_data["author_name"]}')
                    
            except Author.DoesNotExist:
                self.stdout.write(
                    self.style.ERROR(f'Author {profile_data["author_name"]} not found. Please run load_sample_data first.')
                )

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully processed {created_count + updated_count} author profiles '
                f'({created_count} created, {updated_count} updated)'
            )
        )